/**
 * The state pattern is a subdomain of [FSM(Finite-State Machine)](https://en.wikipedia.org/wiki/Finite-state_machine).
 * So the use cases is not an abstract struct, it should have a real example.
 *
 * Example as follow:
 *
 * A -> B
 * B -> C
 * C -> D
 * D -> B
 * E -> A
 *
 *
 * A -> B -> C -> D
 * ^    ^         |
 * |    |         |
 * E    -----------
 */
class State {}

class StatePlayer {
  public state?: State;

  changeState(state: State) {
    this.state = state;
  }
}

export { State, StatePlayer };
