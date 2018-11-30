<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>PageConst</title>
        <link rel="shortcut icon" type="image/svg+xml" href="//audiowars.space/img/audiowars.svg">
        <link rel="stylesheet" type="text/css" href="/css/global.css">
        <script type="text/javascript" src="/js/global.js"></script>
        <script type="text/javascript" src="/js/lib.js"></script>
        <script type="text/javascript" src="/js/app.js"></script>

        <script type="text/javascript" src="/js/controllers/Home.js"></script>
        <script type="text/javascript" src="/js/controllers/Login.js"></script>
        <script type="text/javascript" src="/js/controllers/Construct.js"></script>
    </head>

    <body class="theme-black">
        <div class="centered-slide-wrap home-slide-wrap hidden">
            <div class="centered-slide-block home-slide-block">
                <div class="centered-slide-title">
                    <span class="centered-slide-main-text">PageConst</span>

                    <div class="centered-slide-action-button-list">
                        <button class="link" type="button" app-action="invoke:login">Login</button>
                            <span>/</span>
                        <button class="link" type="button" app-action="invoke:construct">Construct</button>
                    </div>
                </div>

                <div class="centered-slide-contact">
                    Powered by <a href="//audiowars.space" target="audiowars">AudioWars.Space</a>
                </div>
            </div>
        </div>

        <div class="centered-slide-wrap login-slide-wrap hidden">
            <div class="centered-slide-block login-slide-block">
                <div class="centered-slide-title">
                    <span class="centered-slide-main-text">PageConst</span>

                    <div class="centered-slide-action-button-list">
                        <button class="link" type="button" app-action="invoke:home">Home</button>
                            <span>/</span>
                        <button class="link" type="button" app-action="invoke:construct">Construct</button>
                    </div>
                </div>

                <div class="centered-slide-contact">
                    Powered by <a href="//audiowars.space" target="audiowars">AudioWars.Space</a>
                </div>
            </div>
        </div>

        <div class="centered-slide-wrap construct-slide-wrap hidden">
            <div class="centered-slide-block construct-slide-block">
                <div class="centered-slide-title">
                    <span class="centered-slide-main-text">PageConst</span>

                    <div class="centered-slide-action-button-list">
                        <button class="link" type="button" app-action="invoke:home">Home</button>
                            <span>/</span>
                        <button class="link" type="button" app-action="invoke:login">Login</button>
                    </div>
                </div>

                <div class="centered-slide-contact">
                    Powered by <a href="//audiowars.space" target="audiowars">AudioWars.Space</a>
                </div>
            </div>
        </div>
    </body>
</html>
