踩坑：
    部分mac用户可能会出现截图问题，这是因为npm mocha-phantomjs 下载的需要在一次解压
    需要upx解压
    具体步骤：
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null
    brew install upx

    然后到安装目录下解压
    upx -d phantomjs
