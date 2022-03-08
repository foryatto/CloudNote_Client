import json

import webview


if __name__ == '__main__':

    # 从配置文件中加载配置
    with open('config.json', 'r', encoding='utf-8') as f:
        appConfig = json.load(f)

    appTitle = appConfig.get('name', 'CloudNote - 云笔记平台') +" - "+appConfig.get('version')

    window = webview.create_window(
        title=appTitle,
        url=appConfig.get('url'),
        width=appConfig.get('width', 1500),
        height=appConfig.get('height', 800),
        resizable=True,  # 窗口大小可调整
        text_select=False,  # 禁止选择文字内容
        confirm_close=True,  # 关闭时提示
    )

    zh = {
        'global.quitConfirmation': u'确定退出吗?',
    }

    webview.start(localization=zh)


