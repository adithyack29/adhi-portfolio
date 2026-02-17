import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";

export async function POST(request: Request) {
    let contact = null;
    let data;

    try {
        data = await request.json();
        console.log("Contact Form Submission:", data);

        // Only attempt DB connection if URI is configured and not the placeholder
        const mongoUri = process.env.MONGODB_URI;
        const isPlaceholder = !mongoUri || mongoUri.includes('placeholder');

        if (!isPlaceholder) {
            try {
                await dbConnect();
                contact = await Contact.create(data);
            } catch (dbError) {
                console.error("Database operation failed:", dbError);
                // Continue to respond success if DB fails but format is correct
            }
        } else {
            console.warn("MONGODB_URI is placeholder or missing. Skipping database save.");
        }

        return NextResponse.json({ success: true, data: contact || data }, { status: 201 });
    } catch (error: any) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Error processing request" },
            { status: 500 }
        );
    }
}
