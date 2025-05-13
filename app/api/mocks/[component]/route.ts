import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ component: string }> }
) {
  try {
    const resolvedParams = await params;
    const component = resolvedParams.component;
    const filePath = path.join(process.cwd(), 'app', 'mocks', `${component}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading mock data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 