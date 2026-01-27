import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { LinkItem } from "@/types";

const DATA_FILE = path.join(process.cwd(), "src/data/links.json");

async function readData(): Promise<LinkItem[]> {
    try {
        const data = await fs.readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data file:", error);
        return [];
    }
}

async function writeData(data: LinkItem[]) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
    const links = await readData();
    return NextResponse.json(links);
}

export async function POST(request: Request) {
    const updatedLinks = await request.json();
    await writeData(updatedLinks);
    return NextResponse.json({ success: true });
}
