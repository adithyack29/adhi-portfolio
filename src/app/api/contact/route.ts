import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        console.log("Contact Form Submission:", data);

        const contact = await Contact.create(data);

        return NextResponse.json({ success: true, data: contact }, { status: 201 });
    } catch (error: any) {
        console.error("Error saving contact:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Error saving contact" },
            { status: 500 }
        );
    }
}
