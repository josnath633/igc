import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Assuming you're using Prisma

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const name = url.searchParams.get("name");

  if (!email) {
    return NextResponse.json(
      { message: "Email and name are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the user exists and is approved in your database
    const user = await prisma.request.findFirst({
      where: { // Assuming you have email in the `Request` model
        name: email,   // You can customize this according to your database
        status: "APPROVED", // Assuming you have a status column for approval
      },
    });

    if (user) {
      return NextResponse.json({ isApproved: true });
    } else {
      return NextResponse.json({ isApproved: false });
    }
  } catch (error) {
    console.error("Error fetching user approval:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
