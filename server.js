const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {Pool} = require('pg'); 
const pool = new Pool({
    user:'jeffrydelapena',
    password:'',
    host: 'localhost',
    port: 5432,
    database: "taskList"
});
const app =express();
const PORT = process.env.PORT || 8000; 

//middleware 
app.use(morgan('combined'));
app.use(express.json());
app.use(cors()); 
app.use(express.static('public'))
//routes
//create
app.post('/api/task', async(req, res)=>{
    try{
        let newTask = req.body;
        
        let result = await pool.query(`INSERT INTO task (description, person_id) VALUES ('${newTask.description}', '${newTask.person_id}')`);
        res.status(200).send('worked');
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`)
    }
})
//readall
app.get("/api/task", async(req, res)=>{
    try{
        let result = await pool.query(`SELECT * FROM task`)
        //console.log(result)
       res.status(200).json(result.rows)
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`);
    }
})
//read specific
app.get("/api/task/:id", async(req, res)=>{
    try{
        const {id}= req.params;
        let result = await pool.query(`SELECT * FROM task WHERE task_id = ${id}`)
       res.status(200).send('worked for read spec taask')
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`);
    }
})
//update 
app.put("/api/task/:id", async(req,res)=>{
    try{
        console.log(req.params)
        const id = req.params.id;
        const taskUpdate = req.body;
        let result = await pool.query(`UPDATE task SET description = '${taskUpdate.descrption}' WHERE task_id = ${id}`);
        console.log(result)
       res.status(200).send('worked for update spec task')
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`);
    }
})

//delete

app.delete("/api/task/:id", async(req, res)=>{
    try{
        const {id}= req.params;
        let result = await pool.query(`DELETE FROM task WHERE task_id = ${id}`)
        console.log(result)
       res.status(200).send('worked for DELETE')
    }catch(err){ 
        console.error(err);
        res.status(500).send(`Error Encountered: ${err}`);
    }
})



//error
app.use((req, res)=>{
    res.status(404).send('Page not found jeff')
})
//listen 
app.listen(PORT, ()=>{console.log('working')})