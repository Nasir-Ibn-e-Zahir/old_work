import { Webhook } from 'svix';
import { headers } from 'next/headers';
import {  clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import {User} from '@prisma/client'
import { db } from '@/lib/db';


export async function POST(req: Request) {
  console.log("🔹 Webhook received!");

  // Ensure SIGNING_SECRET is available
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    console.error("❌ Error: SIGNING_SECRET is missing!");
    return new Response('Error: SIGNING_SECRET is missing', { status: 500 });
  }

  // Create Svix instance
  const wh = new Webhook(SIGNING_SECRET);

  // Extract Headers (Fixing `headers()` usage)
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Error: Missing Svix headers");
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // Read Raw Body (Fixing JSON Parsing Issue)
  let rawBody;
  try {
    rawBody = await req.text(); // Use `req.text()` instead of `req.json()`
    // console.log("✅ Raw body received:", rawBody);
  } catch (error) {
    console.error("❌ Error reading request body:", error);
    return new Response("Error: Invalid request body", { status: 400 });
  }

  // Parse JSON manually
  // let payload;
  try {
    // payload = JSON.parse(rawBody);
    // console.log("✅ Parsed JSON:", payload);
  } catch (error) {
    console.error("❌ Error parsing JSON:", error);
    return new Response("Error: Invalid JSON", { status: 400 });
  }

  // Verify Webhook Signature
  let evt: WebhookEvent;
  try {
    evt = wh.verify(rawBody, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("✅ Webhook verified!");
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error: Verification failed", { status: 400 });
  }

  // Process the Webhook Event
  // console.log(`🔹 Received webhook: ${evt.type}`);
  

  // This is when User is created or Updated
  if (evt.type === "user.created" || evt.type === "user.updated") {
    // console.log("✅ User ID:", evt.data.id);
    // console.log("✅ User Data:", evt.data);
    const data = evt.data;
    const user: Partial<User> = {
      id: data.id,
      email: data.email_addresses[0].email_address,
      picture: data.image_url,
    };

    if ('first_name' in data && 'last_name' in data) {
      user.name = `${data.first_name} ${data.last_name}`;
    }
    if(!user) return;

    const dbUser = await db.user.upsert({
      where:{
        email:user.email
      },
      update:user,
      create:{
        id:user.id!,
        name:user.name!,
        email:user.email!,
        picture:user.picture!,
        role: user.role || "USER"
      }
    });
    const client = await clerkClient();
    await client.users.updateUser(data.id,{
      privateMetadata:{
        role: dbUser.role || "USER"
      }
    })

    
  }


  // This is when User is deleted!
  if(evt.type === "user.deleted"){
    const userId = evt.data.id
    console.log(`The user of id ${userId} has been deleted!`)
    await db.user.delete({
      where:{
        id: userId
      }
    })
  }
  return new Response("Webhook received", { status: 200 });
}
