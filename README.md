# V6-Load
## Simple K6 Load Tester

## Permission Flags:
#### Deno Requires explicit permission flags for specific access to resources.
```
    Example from deno.json:

    > deno run --allow-env --allow-run --allow-net --allow-read app.ts
```

### Requirements:
    -> Deno
    -> K8s [@kubernetes/client-deno] //  Kubernetes client for Kubernetes api
    -> Kubernetes_apis // handles request work 
    -> Cliffy // Deno
    -> Chalk // NPM


###### Notes:
-> Information is stored in the kubeconfig.json file.
-> CLI REPL
-> Prompt For which Cluster to run test on.
-> Configure Test:
    -> Number of Pods Requested
    -> CPU // Memory Allocated per pod
    -> Number of threads for spinning up Pods
-> Saves Config to file under Profiles/
-> Takes the loaded or Default Configuration
-> Spin threads to spin up new pods.
-> Timestamps start of test and each time a request to spin new pod
-> Wait 5s
    ? Confirm if Pod spun

    ^ Pod Spun Successfully
    -> From there it makes a Timestamp Once Pod is spun
    -> Count of max pods increases

    X Pod fail to spin
        -> Wait again for total max of 30s
        -> If after 30s check and fail to confirm pod spun we know max reached.


Program should Read -> Update -> Save: Kubernetes Config to cwd

Program should:
    -> Set Test Type
        Load Scaling Performance Test
        *v8 tests
        --Set Test Parameters

    -> Save/Load Test Parameters
        -> From File
        -> To File
    
    -> Load kubernetes config from file to test
    -> Update current kubernetes target

    -> Process Results
        -> Save to csv File
        -> Print to Screen
        -> Upload CSV to server
    
    -> Needs to have ability to be fired with just commands.


Notes for operating on the kubernetes client ->
get the kubeconfig into cache
get the context to load test on
 -> list contexts by namespace?
get the required parameters for the load test
Run the load test while being able to send emergency cancel command
Save load test into csv.