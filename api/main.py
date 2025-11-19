from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import base64
import json
from openai import OpenAI
import dotenv, os
dotenv.load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Add both ports in case Next.js uses 3001
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1/"
)

@app.post("/analyze-foot-image")
async def analyze_foot_image(image: UploadFile = File(...)):
    try:
        # Read file bytes
        img_bytes = await image.read()

        # Convert to base64 data URL
        encoded = base64.b64encode(img_bytes).decode("utf-8")
        image_url = f"data:image/jpeg;base64,{encoded}"

        # Build content EXACTLY like your working code
        content = [
            {
                "type": "text",
                "text": (
                    "Analyze this image and answer in strict JSON only.\n"
                    "Return: {is_foot: boolean, is_clear: boolean, foot_size: string or null}.\n\n"
                    "Definitions:\n"
                    "- is_foot: true if the picture predominantly contains a foot or feet.\n"
                    "- is_clear: true if the foot is clear enough to estimate size.\n"
                    "- foot_size: provide approximate foot size in cm, only if both is_foot and is_clear are true, Use conversions if necessary. If previous conditions are not met, return null.\n"
                    "Respond ONLY with JSON."
                )
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": image_url
                }
            }
        ]

        # Call Qwen-VL
        completion = client.chat.completions.create(
            model="qwen-vl-plus",
            messages=[{
                "role": "user",
                "content": content
            }]
        )

        raw = completion.choices[0].message.content

        # Parse JSON returned by model
        try:
            parsed = json.loads(raw)
        except:
            cleaned = raw.replace("```json", "").replace("```", "").strip()
            parsed = json.loads(cleaned)

        return JSONResponse(content=parsed)

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "error": str(e),
                "hint": "Most common issue: model returned malformed JSON. Parsing failed.",
                "docs": "https://www.alibabacloud.com/help/en/model-studio"
            }
        )

@app.get("/test-chat")
async def test_chat():
    try:
        completion = client.chat.completions.create(
            model="qwen-vl-plus",  # or qwen-turbo, qwen-plus
            messages=[
                {"role": "user", "content": "Say hello in JSON: {hello: 'world'}"}
            ]
        )

        return {
            "response": completion.choices[0].message.content
        }

    except Exception as e:
        return {
            "error": str(e),
            "hint": "If this fails, your API key or endpoint is incorrect."
        }

@app.get("/debug-api-key")
async def debug_api_key():
    return {
        "DASHSCOPE_API_KEY": os.getenv("DASHSCOPE_API_KEY")
    }