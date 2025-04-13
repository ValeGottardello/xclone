export async function POST(req) {
    const body = await req.json();
    const { user_id } = body;
  
    // Here you would delete user data from Supabase or your DB
    console.log(`Received request to delete data for Facebook user ID: ${user_id}`);
  
    // For now, just return a success message
    return Response.json({
      status: "success",
      message: `Data for user ID ${user_id} has been deleted (simulated).`
    });
  }
  