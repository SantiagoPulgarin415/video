const express = require('express')
const routes = express.Router()

routes.get('/cliente/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM clientes',(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/cliente/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO clientes set ?',[req.body],(err, rows)=>{
            if(err) return res.send(err)

            res.send('person inserted!')
        })
    })
})

routes.delete('/cliente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM clientes WHERE id=?',[req.params.id],(err, rows)=>{
            if(err) return res.send(err)

            res.send('person excluded!')
        })
    })
})

routes.put('/cliente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE clientes set ? WHERE id = ?',[req.body,req.params.id],(err, rows)=>{
            if(err) return res.send(err)

            res.send('person updated!')
        })
    })
})


routes.post('/compras/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        const hoy = new Date();
        let total = 0;
        let productId;

        req.body.forEach(item => {
            total += item.subtotal;
        });

        const compraJson = {
            precio_final: total,
            fecha_compra: hoy.toLocaleDateString()
        };

        conn.query('INSERT INTO compras set ?',[compraJson],(err, rows)=>{
            if(err) return res.send(err)
            productId = rows.insertId;
            req.body.forEach(item => {
                const compraRepuestoJson = {
                    id_compra_fk: productId,
                    ...item,
                };
                conn.query('INSERT INTO compra_x_repuesto set ?',[compraRepuestoJson],(err, rows)=>{
                    if(err) return res.send(err)
                })
            });
        })

        res.send('datos guardados')
    })
})




module.exports = routes