import request from 'supertest';
import app from '../server.mjs';

import { Item, List } from '../models/api-model.js';
import { startServer, endServer } from '../services/mongo.connect.js';

describe('Run TODOLIST', ()=> {
    beforeAll(async () => {
        await startServer();
    });
    afterAll(async () => {
        await endServer();
    });

    describe('TEST getTodoList with GET/POST/DELETE', () => {
        test('should respond with 200 success', async () => {
            const mainList = await Item.find({});
            if(mainList.length === 0) {
                await request(app)
                    .get('/api')
                    .set('Accept', 'application/json')
                    .expect(302)
                    .expect('Location', '/api');
            };
            const resp = await request(app)
                .get('/api')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            expect(resp.body).toHaveProperty('mainData');
            expect(resp.body).toHaveProperty('customListNames');
        });        
        
        test('should redirect to /api', async () => {
            await request(app)
                .post('/api')
                .set('Accept', 'application/json')
                .send({input: 'Item-Testing', value: 'Date'})
                .expect(302)
                .expect('Location', '/api');
        });

        test('should catch missing input value', async () => {
            const resp = await request(app)
                .post('/api')
                .set('Accept', 'application/json')
                .send({input: "", value: 'Date'})
                .expect(400)
            expect(resp.body).toStrictEqual(
                "Please provide a name to add on the list"
            );
        });
        
        test('should redirect to /api', async () => {
            const checkItemToDelete = await Item.findOne({name: 'Item-Testing'}, '_id').exec();
            await request(app)
                .delete('/api')
                .set('Accept', 'application/json')
                .send({itemID: checkItemToDelete._id, value: 'Date'})
                .expect(303)
                .expect('Location', '/api');
        });
    });

   
    describe('TEST CustomList with GET/POST/DELETE', () => {
        test('should respond with 201 success', async () => {
            const resp = await request(app)
                .post('/api/createlist')
                .set('Accept', 'application/json')
                .send({title: 'Custom-Title-Testing'})
                .expect('Content-Type', /json/)
                .expect(201);
            expect(resp.body).toStrictEqual(
                'Custom-title-testing successfully created in the custom list' 
            );
        });
        
        test('get ListName', async () => {
            const listName = 'Custom-title-testing';
            const resp1 = await request(app)
                .get(`/api/${listName}?`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(resp1.body).toHaveProperty('customList');
            expect(resp1.body).toHaveProperty('customListNames');

            const wronglistName = "zzzzzz";
            const resp2 = await request(app)
                .get(`/api/${wronglistName}?`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404);
            expect(resp2.body).toStrictEqual('Zzzzzz');
        });
        
        test('should redirect /api/Custom-title-testing', async () => {   
            await request(app)
                .post('/api')
                .set('Accept', 'application/json')
                .send({input: 'Item-Testing', value: 'Custom-title-testing'})
                .expect(302)
                .expect('Location', '/api/Custom-title-testing');
        }); 

        test('should catch missing input value', async () => {
            const resp = await request(app)
                .post('/api')
                .set('Accept', 'application/json')
                .send({input: "", value: 'Custom-title-testing'})
                .expect(400)
            expect(resp.body).toStrictEqual(
                "Please provide a name to add on the list"
            );
        });

        test('should redirect to /api/Custom-title-testing', async () => {
            const checkItemToDelete = await List.findOne({name: 'Custom-title-testing'}, 'items').exec();
            const itemId = checkItemToDelete.items.find(item => item.name === 'Item-Testing')._id;
            await request(app)
                .delete('/api')
                .set('Accept', 'application/json')
                .send({itemID: itemId, value: 'Custom-title-testing'})
                .expect(303)
                .expect('Location', '/api/Custom-title-testing');
        });

        test('should respond with 200 success', async () => {
            const resp = await request(app)
                .delete('/api/deletelist')
                .set('Accept', 'application/json')
                .send({title: 'Custom-title-testing'})
                .expect('Content-Type', /json/)
                .expect(200);
            expect(resp.body.notification).toBe(
                'Custom-title-testing successfully deleted from the custom list' 
            );
        });
    });
});
