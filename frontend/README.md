<h1>📖 Documentação Front-end</h1>
<p>Este front-end foi desenvolvido, principalmente, com Typescript, React e Next.</p>

<br>

<h2>🔗 Relacionados</h2>
<ul>
<li><a href="https://github.com/dhomini-rabelo/remotely-store">Introdução</a></li>
<li><a href="https://github.com/dhomini-rabelo/remotely-store/tree/main/backend">Documentação Back-end</a></li>
</ul>

<br>
<h2>🔗 Tópicos</h2>
<ul>
<li><a href="#organization">Organização</a></li>
<li><a href="#tools">Ferramentas</a></li>
<li><a href="#auth">Autenticação</a></li>
<li><a href="#contexts">Contextos</a></li>
<li><a href="#hooks">Hooks</a></li>
<li><a href="#routes">Rotas</a></li>
<li><a href="#tests">Testes</a></li>
</ul>

<br>
<h2 id="organization">🎯 Organização</h2>

<ul>

<li>remotely-store/frontend/ - Tudo relacionado ao front-end</li>
<li>remotely-store/frontend/app/ - Código do fonte do projeto Next</li>
<li>remotely-store/frontend/ - Além da pasta app/, fica o disponível para documentação, testes específicos e outras coisas relacionadas ao front-end</li>
<li>remotely-store/frontend/app/assets - Armazena arquivos estáticos</li>
<li>remotely-store/frontend/app/code - Contém código relacionado com a lógica do projeto, além de configurações e estrutura dos Models</li>
<li>remotely-store/frontend/app/layout - Contém código relacionado com a parte visualização e renderização do projeto</li>
<li>remotely-store/frontend/app/pages - Rotas do site</li>

</ul>


<h3>Páginas no projeto</h3>

<p>
Os arquivos que que atuam como páginas web neste projeto terminam em [file].page.tsx, o que permite aproximar
determinados arquivos relacionados somente com aquela página.
</p>

<h3>Componentes dentro de componentes</h3>

<p>
Quando temos componentes dentro de um componente que está dentro uma pasta /components/ ele fica numa pasta
chamada /subcomponents/ e vice-versa, para facilitar as importações e melhorar a estrutura.
</p>

<h3>Sessões</h3>

<p>
Componentes que se ocupam o mesmo espaço no mesmo contexto, ficam dentro de pastas /sessions/.
</p>