import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";  // Import NextResponse

export async function GET() {
  try {
    // Retrieve comments that haven't expired
    const comments = await prisma.comment.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return a successful response with the comments
    return NextResponse.json(comments);
  } catch (error) {
    // Handle errors (e.g., database connection issues)
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching comments" },
      { status: 500 }
    );
  }
}
