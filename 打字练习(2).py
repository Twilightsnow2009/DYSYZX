"""
欢迎加入Termux交流社区
官网主站：https://twilightsnow2009.github.io/Termux/
镜像站：https://1hyql.github.io/Termux/
QQ频道：termux2024
QQ群：369925819
"""
import requests
import random
import time
import unicodedata
import re

TIMEOUT = 3
API_ZH = "https://v1.jinrishici.com/all.json"
API_EN = "https://api.quotable.io/random"

def get_text():
    url = API_ZH if random.random() < 0.5 else API_EN
    r = requests.get(url, timeout=TIMEOUT)
    r.raise_for_status()
    return r.json()["content"]

def visible_chars(s):
    s = unicodedata.normalize('NFKC', s)
    return re.sub(r'[^\u4e00-\u9fa5A-Za-z0-9]', '', s)

def typing_test():
    try:
        text = get_text()
    except:
        print("请检查网络")
        return
    print("\n请输入以下内容：\n" + text + "\n")
    input("按 Enter 开始...")
    start = time.time()
    user = input()
    end = time.time()
    elapsed = end - start
    ref = visible_chars(text)
    inp = visible_chars(user)
    correct = sum(a == b for a, b in zip(inp, ref))
    accuracy = (correct / max(len(ref), 1)) * 100
    wpm = (len(inp) / 5) / (elapsed / 60) if elapsed else 0
    score = accuracy * 0.6 + min(wpm, 150) * 0.4
    print("\n用时: %.2f 秒" % elapsed)
    print("准确率: %.1f %%" % accuracy)
    print("速度: %.1f WPM" % wpm)
    print("得分: %.1f / 100" % score)

if __name__ == "__main__":
    print("=== 打字练习 ===")
    while True:
        typing_test()
        if input("\n再来一次？(y/n): ").lower() != "y":
            break
