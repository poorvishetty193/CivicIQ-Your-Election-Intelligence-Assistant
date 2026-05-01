import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  if (!query && (!lat || !lng)) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${apiKey}`

  if (query) {
    url += `&query=${encodeURIComponent(query + " polling place")}`
  } else if (lat && lng) {
    url += `&location=${lat},${lng}&radius=5000&keyword=polling%20place`
  }

  try {
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Places API error:", error)
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 })
  }
}
