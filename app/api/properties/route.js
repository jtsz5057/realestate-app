import connectDB from "@/config/database";

export const GET = async (request) => {
    try {
        await connectDB();

        return new Response('Success', { status: 200 });
    } catch (error) { 
        return new Response('Failed', { status: 500 })
    }
};