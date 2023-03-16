const Hapi = require('@hapi/hapi');

// Initialize the server
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

// Define the contacts data
const contacts = [
    {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890"
    },
    {
        "id": "2",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "0987654321"
    }
];

// Define the routes
server.route({
    method: 'POST',
    path: '/contacts',
    handler: (request, h) => {
        const { id, name, email, phone } = request.payload;
        const newContact = { id, name, email, phone };
        contacts.push(newContact);
        return h.response(newContact).code(201);
    }
});

server.route({
    method: 'GET',
    path: '/contacts',
    handler: (request, h) => {
        return h.response(contacts).code(200);
    }
});

server.route({
    method: 'DELETE',
    path: '/contacts/{id}',
    handler: (request, h) => {
        const { id } = request.params;
        const index = contacts.findIndex(contact => contact.id === id);
        if (index > -1) {
            contacts.splice(index, 1);
        }
        return h.response().code(200);
    }
});

// Start the server
const start = async () => {
    try {
        await server.start();
        console.log(`Server running on ${server.info.uri}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
