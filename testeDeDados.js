const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'br994.hostgator.com.br',
    port: 3306,
    dialect: 'mysql',
    user: 'ffivep56_samir',
    password: 'Semprejuntos',
    database: 'ffivep56_usuarios',  
});

connection.connect();

const query = `
  ALTER TABLE Users
  ADD COLUMN telefone VARCHAR(15),
  ADD COLUMN endereco VARCHAR(100);
`;

connection.query(query, (error, results, fields) => {
  if (error) throw error;
  console.log('Tabela alterada com sucesso!');
});

connection.end();
