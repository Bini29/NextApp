export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ name: "John Doe" });
  } else if (req.method === "POST") {
    console.log("POST");
  }
}
