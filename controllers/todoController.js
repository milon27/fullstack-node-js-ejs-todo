
module.exports = function (app) {
    /**
     * our todo object
     * @todoObject
     * {
     *  item:'test todo',
     *  'id_done':false
     * }
     */
    /**
     *  @data @array this is act as a database of our todo app.
     */
    let data = [
    ];

    /**
     * @description load the data into ejx view (index.ejx)
     */
    app.get('/', (req, res) => {
        res.render('index', { todos: data });
    });

    /**
     * @description crete a new todo item 
     */
    app.post('/todo', (req, res) => {
        data.push({ item: req.body.item, is_done: req.body.is_done });
        res.send(req.body.item);
    });

    /**
     * @description delete todo item
     */
    app.delete('/todo/:todo', (req, res) => {
        let item_text = req.params.todo;
        data = data.filter(todo => {
            let newitem = todo.item;
            return newitem.split(' ').join('-') !== item_text;
        });

        res.send(`todo deleted ${JSON.stringify(data)} this item: ${item_text}`);
    });

    /**
     * @description update todo:  is todo item is done or not
     */
    app.put('/todo/:todo', (req, res) => {
        let todo_item_text = req.params.todo;

        data = data.map(item => {
            let parseitem = item.item.split(' ').join('-');
            if (parseitem === todo_item_text) {
                item.is_done = true;
            }
            return item;
        });

        res.send({ "success": 1, data })
    });



}