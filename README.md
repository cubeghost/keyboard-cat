# keyboard cat
i put a [cat paw keycap](https://drop.com/buy/zomo-aluminum-silicone-kitty-paw-artisan-keycap) on my `forward_delete` key and i wanted to open a random cat gif when i press it

### workflow
install `keyboard-cat.workflow` as a service and bind it to a keyboard shortcut. i used `cmd-shift-0`

### binding to a specific key with karabiner
open `~/.config/karabiner/karabiner.json`

add something like the following to complex_modifications > rules:
```
{
  "description": "forward_delete to cmd+shift+0",
  "manipulators": [
    {
      "type": "basic",
      "from": {
        "key_code": "forward_delete",
        "modifiers": {
          "optional": [
            "any"
          ]
        }
      },
      "to": [
        {
          "key_code": "0",
          "modifiers": [
            "left_command",
            "left_shift"
          ]
        }
      ]
    }
  ]
}
```

### using the icon on macOS
https://stackoverflow.com/a/40690900


### get a giphy API key
https://developers.giphy.com/dashboard/?create=true
