## 1.2.1 Linear recursion and iteration
- a function is a pattern for the local evolution of a computational process
- linear recursive process 
- linear iterative process
- chain of deferred operations 
- linear recursive process -> chain of deferred operations -> the interpreter keeps track of the operations to be perfomed later on -> hiden information maintained by the interpreter
- linear iterative process -> state can be summarized by a fixed number of state variables, together with a fixed rule that descibres how the state variables houdl be updated as the process moves from state to state, and specifies conditions under which the process should terminate -> state variables provide complete description of the state of the process at any point -> the interpreter needs to keep track only of the names in order to execute the process
- iterative process -> can be realized in hardware, recursive process -> requires a machine that uses an auxiliary data structure know as stack
- recursive process vs recursive function -> recursive function: referring to the syntactic fact that the function declaration refers (directly or indirectly) to the function itself, recursive process: as following a pattern that is, we are speaking about how the process evolves
- tail recursive -> an implementation with the propery: iterative process describe by a recursive funuction
