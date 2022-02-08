from typing import List

from fastapi import FastAPI, Header
from tortoise.contrib.fastapi import register_tortoise

from models import Project_Pydantic, ProjetIn_Pydantic, Projects


app = FastAPI()


@app.get('/api/projects', response_model=List[Project_Pydantic])
async def get_orders(request_user_id: str = Header(None)):
    return await Project_Pydantic.from_queryset(
        Projects.filter(created_by=request_user_id)
    )


@app.post('/api/projects', response_model=Project_Pydantic)
async def create_user(order: ProjectIn_Pydantic,
                      request_user_id: str = Header(None)):
    data = order.dict()
    data.update({'created_by': request_user_id})

    project_obj = await Projects.create(**data)
    return await Project_Pydantic.from_tortoise_orm(project_obj)

@app.delete('/api/projects/{id}')


register_tortoise(
    app,
    db_url='sqlite://:memory:',
    modules={'models': ['models']},
    generate_schemas=True,
    add_exception_handlers=True,
)
