import { NextRequest, NextResponse } from "next/server";

interface Params {
    user_id: string;
}

export async function GET(req: NextRequest, { params }: {params: Params}) {
    
    const user_id = params.user_id;

    return NextResponse.json({
        success: true,
        data: {
            id: user_id,
            name: 'Alessandro',
        },
    });
}