import os
from openai import OpenAI
import dotenv
dotenv.load_dotenv()
print(os.getenv("DASHSCOPE_API_KEY"))

# Initialize the client
client = OpenAI(
    # The API keys for the Singapore and China (Beijing) regions are different. To obtain an API key, see https://modelstudio.console.alibabacloud.com/?tab=model#/api-key
    # If you have not configured an environment variable, replace the following line with your Model Studio API key: api_key="sk-xxx",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    # The following URL is for the Singapore region. If you use a model in the China (Beijing) region, replace the URL with: https://dashscope.aliyuncs.com/compatible-mode/v1
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1/"
)

# Test 1: Basic Qwen model interaction
def test_basic_qwen():
    try:
        completion = client.chat.completions.create(
            model="qwen-plus",  
            messages=[
                {'role': 'system', 'content': 'You are a helpful assistant.'},
                {'role': 'user', 'content': 'Who are you?'}
            ]
        )
        print("Basic Qwen Test:")
        print(completion.choices[0].message.content)
        print()
    except Exception as e:
        print(f"Error in basic Qwen test: {e}")
        print("For more information, see https://www.alibabacloud.com/help/en/model-studio/developer-reference/error-code")

# Test 2: Image analysis with Qwen-VL (vision language model)
def test_image_analysis(image_url=None, image_path=None):
    try:
        # Prepare content based on whether we have a URL or local file
        content = [
            {
                "type": "text",
                "text": (
                    "Analyze this image and answer in strict JSON only.\n"
                    "Return: {is_foot: boolean, is_clear: boolean, foot_size: string or null}.\n\n"
                    "Definitions:\n"
                    "- is_foot: true if the picture predominantly contains a foot or feet.\n"
                    "- is_clear: true if the foot is clear enough to estimate size.\n"
                    "- foot_size: provide approximate foot size only if both is_foot and is_clear are true; otherwise null.\n"
                    "\nConsider typical adult sizes and perspective cues when estimating.\n"
                    "Do NOT add extra text or explanation — only return JSON."
                )
            }
        ]
        
        if image_path:
            # Handle local file
            import base64
            with open(image_path, "rb") as image_file:
                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
            image_url = f"data:image/jpeg;base64,{encoded_image}"
            
        if image_url:
            content.append({
                'type': 'image_url',
                'image_url': {
                    'url': image_url
                }
            })
        
        completion = client.chat.completions.create(
            model="qwen-vl-plus",  # Using vision-language model
            messages=[
                {
                    'role': 'user',
                    'content': content
                }
            ]
        )
        print("Image Analysis Test:")
        print(completion.choices[0].message.content)
        print()
    except Exception as e:
        print(f"Error in image analysis test: {e}")
        print("For more information, see https://www.alibabacloud.com/help/en/model-studio/developer-reference/error-code")

# Test 3: Structured response for foot measurement
def test_structured_foot_measurement(image_url=None, image_path=None):
    try:
        # Prepare content based on whether we have a URL or local file
        content = [
            {
                'type': 'text',
                'text': ''' What is in this picture?'''

                # 'text': '''Analyze this foot image and provide the following information in JSON format:
                # {
                #   "foot_length_cm": [number],
                #   "confidence": [0-100],
                #   "notes": [any observations]
                # }
                # Measure from heel to the longest toe. If you cannot determine the size, set foot_length_cm to null.'''
            }
        ]
        
        if image_path:
            # Handle local file
            import base64
            with open(image_path, "rb") as image_file:
                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
            image_url = f"data:image/jpeg;base64,{encoded_image}"
            
        if image_url:
            content.append({
                'type': 'image_url',
                'image_url': {
                    'url': image_url
                }
            })
        
        completion = client.chat.completions.create(
            model="qwen-vl-plus",
            messages=[
                {
                    'role': 'user',
                    'content': content
                }
            ],
            response_format={"type": "json_object"}
        )
        print("Structured Foot Measurement Test:")
        print(completion.choices[0].message.content)
        print()
    except Exception as e:
        print(f"Error in structured foot measurement test: {e}")
        print("For more information, see https://www.alibabacloud.com/help/en/model-studio/developer-reference/error-code")

# Run tests
if __name__ == "__main__":
    # Run basic test
    # test_basic_qwen()
    
    # For image tests, you can provide either an image URL or a local file path
    # Example with URL: test_image_analysis("https://example.com/foot-image.jpg")
    # Example with local file: test_image_analysis(image_path="./sample_images/foot.jpg")
    test_image_analysis(image_path="C:\\Users\\yujey\\OneDrive\\Documents\\feetscope\\public\\test1.jpg")
    
    # Example with URL: test_structured_foot_measurement("https://example.com/foot-image.jpg")
    # Example with local file: test_structured_foot_measurement(image_path="./sample_images/foot.jpg")
    
    print("To test image analysis, uncomment the image test functions and provide either a valid image URL or local file path.")