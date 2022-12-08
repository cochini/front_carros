const express = require("express");

const app = express();
const axios = require("axios").default;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MAPEAMENTO DA PASTA PUBLIC
app.use(express.static("public"));

//CONFIGURA O EJS COMO VIEW ENGINE (REDENRIZA AS PÁGINAS DE FRONT-END)
app.set("view engine", "ejs");

//ROTA DE CADASTRO DE CATEGORIAS
app.get("/cadastroMarcas", (req, res) => {
	res.render("marca/cadastroMarca");
});

//ROTA DE LISTAGEM DE CATEGORIAS
app.get("/listagemMarcas", (req, res) => {
	const urlListagemMarca = "http://localhost:3000/listarMarca";

	/*
    CHAMADA PELO AXIOS:
    1 - URL DA ROTA (urlListagemMarca)
    2 - CALLBACK DA RESPOSTA DA CHAMADA
    */
	axios.get(urlListagemMarca).then((response) => {
		// console.log(response.data);
		// res.send(response.data);
		let marcas = response.data;
		res.render("marca/listagemMarca", { marcas });
	});
});

//ROTA DE LISTAGEM DE EDIÇÃO
app.get("/formEdicaoMarcas/:id_marca", (req, res) => {
	//RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
	let { id_marca } = req.params;
	// console.log(id);

	//CHAMADA DO AXIOS PARA A API:
	const urlListagemMarca = `http://localhost:3000/listarMarca/${id_marca}`;

	axios.get(urlListagemMarca).then((response) => {
		let marca = response.data;
		res.render("marca/editarMarca", { marca });
	});
});

//ROTA DE EDIÇÃO
app.post("/alterarMarca", (req, res) => {
	const urlAlterarMarca = "http://localhost:3000/alterarMarca";
	console.log(req.body);

	axios
		.put(urlAlterarMarca, req.body)
		.then((response) => {
            axios.get("http://localhost:3000/listarMarca").then((response) => {
                let marcas = response.data;
                console.log("RESPONSE: " + response.data);
                res.render("marca/listagemMarca", { marcas });
            });
        });
    });
            // res.send("ALTERADO!"))


app.post("/inserirMarca", (req, res) => {
	const urlAlterarMarca = "http://localhost:3000/inserirMarca";
	console.log(req.body);

	axios
		.post(urlAlterarMarca, req.body)
		.then((response) => {
            axios.get("http://localhost:3000/listarMarca").then((response) => {
                let marcas = response.data;
                console.log("RESPONSE: " + response.data);
                res.render("marca/listagemMarca", { marcas });
            });
        });
    });

app.get("/delete/:id_marca", (req, res) => {
	//RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
	let { id_marca } = req.params;
	// console.log(id);

	//CHAMADA DO AXIOS PARA A API:
	const urlDeleteMarca = `http://localhost:3000/deletarMarca/${id_marca}`;

	axios.delete(urlDeleteMarca).then((response) => {
		axios.get("http://localhost:3000/listarMarca").then((response) => {
			let marcas = response.data;
			console.log("RESPONSE: " + response.data);
			res.render("marca/listagemMarca", { marcas });
		});
	});
});

app.listen(3001, () => {
	console.log("SERVIDOR RODANDO EM: http://localhost:3001");
});
