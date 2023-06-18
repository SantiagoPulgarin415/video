const express = require('express')
const routes = express.Router()

routes.get('/user/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM usuarios',(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/user/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO usuarios set ?',[req.body],(err, rows)=>{
            if(err) return res.send(err)

            res.send('person inserted!')
        })
    })
})

routes.delete('/user/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM usuarios WHERE id=?',[req.params.id],(err, rows)=>{
            if(err) return res.send(err)

            res.send('person excluded!')
        })
    })
})

routes.put('/user/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE usuarios set ? WHERE id = ?',[req.body,req.params.id],(err, rows)=>{
            if(err) return res.send(err)

            res.send('person updated!')
        })
    })
})





module.exports = routes