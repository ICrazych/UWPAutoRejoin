
# Roblox UWP Auto Rejoin

Source code is shit, but it works and i don't care
Also it works only for one roblox instance


## Steps 1-4:

- 1 - Install [NodeJS](https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi)
- 2 - Download source and open **installDependencies.bat** file
- 3 - Now modify **restart.cmd** file, change it to your private server 
- 4 - And Finally, run **robloxRestarter.cmd**. (Close your roblox before)


## Step 5: Enable Auto Inject in Fluxus and put this script into your autoexec folder

```lua
if not game:IsLoaded() then game.Loaded:Wait() end

task.spawn(function() 
    game:GetService("CoreGui").RobloxPromptGui.promptOverlay.ChildAdded:Connect(function(child)
        task.wait()
        if child.Name == 'ErrorPrompt' then
            task.wait(5)
            game:Shutdown()
        end
    end)
    while task.wait(10) do
        request({
            Url = "http://localhost:3000/api/ping",
            Body = {},
            Method = "POST"
        })
    end
end)
```

