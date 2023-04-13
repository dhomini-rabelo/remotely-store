<h1>📖 Documentação Back-end</h1>
<p>Este back-end foi desenvolvido, principalmente, com Python, Django e Django Rest Framework.</p>

<br>

<h2>🔗 Relacionados</h2>
<ul>
<li><a href="https://github.com/dhomini-rabelo/remotely-store">Introdução</a></li>
<li><a href="https://github.com/dhomini-rabelo/remotely-store/tree/main/frontend">Documentação Front-end</a></li>
</ul>

<br>
<h2>🔗 Tópicos</h2>
<ul>
<li><a href="#organization">Organização</a></li>
<li><a href="#tools">Ferramentas</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#db">Banco de dados</a></li>
<li><a href="#admin">Django Admin</a></li>
<li><a href="#routes">Rotas</a></li>
<li><a href="#tests">Testes</a></li>
</ul>

<br>
<h2 id="organization">🎯 Organização</h2>

<ul>

<li>remotely-store/backend/ - Tudo relacionado ao back-end</li>
<li>remotely-store/backend/src/ - Código do fonte do projeto Django</li>
<li>remotely-store/backend/ - Além da pasta src/, fica o disponível para ambiente virtual, documentação, testes específicos e outras coisas relacionadas ao back-end</li>
<li>remotely-store/backend/src/REMOTELY - Configurações principais do projeto</li>
<li>remotely-store/backend/src/apps - Pasta onde estão os apps Django do projeto</li>
<li>remotely-store/backend/src/Core - Recursos que serão utilizados em vários apps</li>
<li>remotely-store/backend/src/frontend - Armazenar arquivos de upload e estáticos</li>
<li>remotely-store/backend/src/tests/fixtures - Fixtures genéricas do projeto</li>
<li>remotely-store/backend/src/tests/tests - Testes de integrações e funcionalidades fora do escopo de apps</li>
<li>remotely-store/backend/src/commands - Comandos do projeto</li>
<li>remotely-store/backend/src/Fast - dependência para comandos, código mais antigo, que pretendo transformar em uma biblioteca</li>

</ul>

<h3>Sobre os apps Django do projeto</h3>

<p>
Eu utilizo apps personalizados no Django, principalmente porque prefiro separar as responsabilidades de um app. O
app padrão do Django deixa o arquivo de views.py junto a arquivos de configurações, como apps.py para o app, models
para tabelas no banco e admin.py para sistema administrativo. Como sabem, o Django é um framework opinado, porém 
ele não nos obriga a usar rotas dentro do app, podemos configurar isto no arquivo inicial de rotas (remotely-store/backend/src/REMOTELY/urls.py). Então, deixo as configurações do app numa camada mais interna
(remotely-store/backend/src/apps/{nome-do-app}/app), e a superior 
(remotely-store/backend/src/apps/{nome-do-app}) é utilizada para gerenciamento de rotas e regras de negócio.
</p>

<h3>Gerenciadores de Model</h3>

<p>
Este projeto utiliza gerenciadores de Model, que tem a função de realizar as ações correspondentes
a cada Model, facilitando a testagem e a utilização. Além de desacoplar o esse tipo de código da classe de um Model, 
localizados em remotely-store/backend/src/apps/sales/actions/managers/.
</p>

<h3>Rotas</h3>

<p>
Quando a rota não faz parte de um CRUD simples, eu utilizo classes para executar as ações, caso necessário faço 
implementações de contratos e interfaces, sempre buscando utilizar os princípios SOLID e outros padrões.
</p>
