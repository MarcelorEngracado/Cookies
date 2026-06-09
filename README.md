# 🍪 Tutorial Interativo de Cookies

Um site didático e interativo para aprender como os cookies funcionam em JavaScript.

## 📋 Recursos

### ✅ Exemplos Práticos

1. **🎨 Preferências de Usuário**
   - Salva nome, tema e idioma em cookies
   - Recupera as preferências ao recarregar a página
   - Demonstra como cookies persistem dados do usuário

2. **📊 Contador de Visitas**
   - Incrementa automaticamente cada vez que a página é carregada
   - Os dados persistem mesmo após fechar e reabrir o navegador
   - Mostra o conceito de rastreamento básico

3. **⚙️ Gerenciador de Cookies**
   - Criar cookies personalizados com nome, valor e data de expiração
   - Visualizar todos os cookies armazenados
   - Deletar cookies individuais ou limpar tudo

### 💻 Código JavaScript Incluído

O site demonstra as três funções principais para trabalhar com cookies:

- `setCookie(nome, valor, dias)` - Criar um cookie
- `getCookie(nome)` - Ler um cookie
- `deleteCookie(nome)` - Deletar um cookie

### 📚 Informações Educacionais

- Explicação sobre o que são cookies
- Limitações (tamanho, quantidade, segurança)
- Dicas de segurança importantes
- Código comentado para aprendizado

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. Explore os diferentes exemplos
3. Teste criar seus próprios cookies
4. Abra o console (F12) para ver os logs das operações

## 🔍 Verificar Cookies do Navegador

Para ver os cookies armazenados:

1. Pressione `F12` para abrir o DevTools
2. Vá até "Application" → "Cookies"
3. Selecione o site atual
4. Veja todos os cookies criados

## 📝 Estrutura do Projeto

```
Cookies/
├── index.html      # Estrutura HTML com exemplos
├── style.css       # Estilos modernos e responsivos
├── script.js       # Lógica JavaScript com comentários
└── README.md       # Este arquivo
```

## ⚠️ Segurança

Este é um projeto educacional. Em produção, lembre-se:

- **Não armazene dados sensíveis** em cookies simples
- **Use HTTPS** para transmitir cookies
- **Use HttpOnly flag** para cookies no servidor
- **Configure SameSite** para evitar ataques CSRF
- **Sempre defina expiração** apropriada para cookies

## 🌐 Responsivo

O site é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 📄 Licença

Projeto educacional livre para uso e modificação.

---

**Desenvolvido com 💜 para aprendizado de JavaScript e Cookies**
