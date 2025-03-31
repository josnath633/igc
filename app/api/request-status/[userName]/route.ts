import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure Prisma is correctly set up

export async function GET(req: NextRequest) {
  try {
   //@ts-ignore
    const { userName } = req.nextUrl.pathname.split("/").pop() || {}; // Extract userName from the URL path

    if (!userName) {
      return NextResponse.json({ error: "User name is required." }, { status: 400 });
    }

    console.log(`Searching for request with userName: ${userName}`);

    // Fetch the request from the database for the provided userName
    const request = await prisma.request.findFirst({
      where: { name: userName }, // Search for the request by user name
    });

    // If no request is found, return a 404 response
    if (!request) {
      console.log(`Request not found for userName: ${userName}`);
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    // If the request is found, return the status
    console.log(`Found request with status: ${request.status}`);
    return NextResponse.json({ status: request.status }, { status: 200 });

  } catch (error) {
    console.error("An error occurred while checking the request status:", error);
    return NextResponse.json(
      { error: "An error occurred while checking the request status." },
      { status: 500 }
    );
  }
}
