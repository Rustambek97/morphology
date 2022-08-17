function parse(grid, buttons, callback) {
    const gridView = new GridView(grid)

    Object
        .entries(buttons)
        .forEach(r => gridView.add(row(r, callback)))

    return grid
}

function row(row, callback) {

    let [name, values] = row

    const rowView = new RowView()

    Object
        .entries(values)
        .forEach(item => rowView.add(dropdown(item, callback))) 

    return rowView
}

function dropdown(dropdown, callback) {
    let [name, value] = dropdown
    if (typeof value === 'string') {
        return new ButtonView(name, value, callback)
    }
    else {
        return new DropdownView(name, menu(dropdown, callback).menu)
    }
}

function menu(menu, callback) {

    let [name, values] = menu

    const menuView = new MenuView(name)

    Object
        .entries(values)
        .forEach(v => menuView.add(item(v, callback))) 

    return menuView
}

function item(item, callback) {

    if (callback === undefined) {
        console.error("callback not exists: " + JSON.stringify(item));
    }

    let [name, value] = item
    if (typeof value === 'string') {
        return new ItemView(name, value, callback)
    }
    else {
        return menu(item, callback)
    }
}
