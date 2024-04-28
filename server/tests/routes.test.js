const request = require('supertest');
const app = require('../index'); // Importez votre application Express depuis votre fichier index.js

describe('Test des routes de l\'API', () => {
  let server;

  before(async () => {
    server = await app.listen(3000); // Lancez le serveur sur le port 3000 avant de commencer les tests
  });



  it('Devrait retourner un tableau d\'utilisateurs', async () => {
    const response = await request(app).get('/api/users'); // Envoyez une requête GET à votre route /api/users
    expect(response.statusCode).toBe(200); // Vérifiez que le statut de la réponse est 200 OK
    expect(Array.isArray(response.body)).toBe(true); // Vérifiez que la réponse est un tableau d'utilisateurs
  });

  // Ajoutez d'autres tests pour chaque route que vous souhaitez tester
});
