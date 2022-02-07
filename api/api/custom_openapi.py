from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
import re
import inspect
from fastapi.routing import APIRoute

def custom_openapi(app: FastAPI) -> FastAPI:
    def get_openapi_schema():
        if app.openapi_schema:
            return app.openapi_schema

        openapi_schema = get_openapi(
            title="Snek API",
            version="0.0.1",
            description="This is a very custom OpenAPI schema",
            routes=app.routes,
        )

        openapi_schema["components"]["securitySchemes"] = {
            "Bearer Auth": {
                "type": "apiKey",
                "in": "header",
                "name": "Authorization",
                "description": "Enter: **'Bearer &lt;JWT&gt;'**, where JWT is the access token"
            }
        }

        # Get all routes where jwt_optional() or jwt_required
        api_router = [route for route in app.routes if isinstance(route, APIRoute)]

        for route in api_router:
            path = getattr(route, "path")
            endpoint = getattr(route,"endpoint")
            methods = [method.lower() for method in getattr(route, "methods")]

            for method in methods:
                # access_token
                if (
                    re.search("jwt_required", inspect.getsource(endpoint)) or
                    re.search("fresh_jwt_required", inspect.getsource(endpoint)) or
                    re.search("jwt_optional", inspect.getsource(endpoint))
                ):
                    openapi_schema["paths"][path][method]["security"] = [
                        {
                            "Bearer Auth": []
                        }
                    ]

        app.openapi_schema = openapi_schema
        return app.openapi_schema

    return get_openapi_schema
