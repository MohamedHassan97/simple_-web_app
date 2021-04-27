// To validate objects
const Joi = require('joi');             // return class

const express = require('express');     // return a function
const app = express();                  // return an object

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' ,code:123,description:"it's a very good course"},
    { id: 2, name: 'course2' ,code: 456,description:"it's a very good course"},
    { id: 3, name: 'course3' ,code:789,description:"it's a very bad course" }
];

const students = [
    { id: 1, name: 'shaf3i' ,code:123},
    { id: 2, name: 'hasan' ,code: 456},
    { id: 3, name: 'ali' ,code:789 }
];


/*
Student entity will have the following properties:

name: string, required, only letters in both cases, apostrophe and dashes are allowed.
code: string, required, must match 7 characters.
id: integer, auto generated.
The endpoints for your API should look like /api/courses/.. and /api/students/..
The endpoints for your forms should look like /web/courses/create and /web/students/create



name: string, required, min length of 5 characters
code: string, required, must match 3 letters followed by 3 numbers.
id: integer, auto generated.
description: string, optional, max length of 200 characters.


*/




// we vave bunch of methods like corresponds to http verbs or http methods
// app.get();
// app.put();
// app.post();
// app.delete();

// To respond to http get request
app.get('/'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
    // This req object has a bunch of useful propereties u can refrence documentation for more info
    res.send('Hello World');
});

// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// to get single course
// api/courses/1 to get course of id 1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    res.send(course);
});

// // we can have multiple parameters
// // http://localhost:3000/api/posts/2021/5
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);  
// });


// Add course
app.post('/web/courses/create', (req, res) => {
    // validate request
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // //Manual validation 
    // if (!req.body.name || req.body.name.length < 3)   //if name does not exist
    // {
    //     // 400 bad request
    //     res.status(400).send('Name is required and should be minimum 3 characters.');
    //     return;
    // }


    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name // assuming that request body there's a name property
    };
    courses.push(course);
    res.send(course);
});


// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});


// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});



//////////////////////////////////////////////





// we vave bunch of methods like corresponds to http verbs or http methods
// app.get();
// app.put();
// app.post();
// app.delete();


// to get all students
app.get('/api/students', (req, res) => {
    res.send(students);
});

// to get single course
// api/courses/1 to get course of id 1
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }
    res.send(student);
});

// // we can have multiple parameters
// // http://localhost:3000/api/posts/2021/5
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);  
// });


// Add course
app.post('/api/students', (req, res) => {
    // validate request
    const { error } = validateStudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
        
    // //Manual validation 
    // if (!req.body.name || req.body.name.length < 3)   //if name does not exist
    // {
    //     // 400 bad request
    //     res.status(400).send('Name is required and should be minimum 3 characters.');
    //     return;
    // }


    // create a new course object
    const student = {
        id: students.length + 1,
        name: req.body.name // assuming that request body there's a name property
    };
    students.push(student);
    res.send(student);
});


// Updating resources
app.put('/api/students/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateStudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course
    student.name = req.body.name;
    res.send(student);
});


// Deleting a course
app.delete('/api/students/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same course
    res.send(student);
});






// Environment variable
const port = process.env.port || 3000

app.listen(port /*PortNumber*/, () => console.log(`Listeneing on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);



function validateCourse(course) {
    const schema =Joi.object( {
        name: Joi.string().required() ,
        //id: Joi.string().min(1).required(),
        code:Joi.string().required(),
        description: Joi.string().optional().max(200)

    
    
    })
    return schema.validate(course);
}


function validateStudent(student) {
    const schema2 =Joi.object( {
        name: Joi.string().min(5).required() ,
        
        code:Joi.string().required()   ,
        

    
    
    })
   

    return schema2.validate(student);
    
}
