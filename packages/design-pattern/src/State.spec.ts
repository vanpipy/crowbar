import { State, StatePlayer } from './State';
import { expect } from 'chai';

describe('State Playgroud', () => {
  it('should have a ready state when the state has been created', () => {
    class RealPlayer extends StatePlayer {}

    class RealState extends State {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      goPrevious() {}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      goNext() {}
    }

    const player = new RealPlayer();

    const A = new RealState();
    A.goNext = () => {
      player.changeState(B);
    };

    const B = new RealState();
    B.goNext = () => {
      player.changeState(C);
    };

    const C = new RealState();
    C.goNext = () => {
      player.changeState(D);
    };

    const D = new RealState();
    D.goNext = () => {
      player.changeState(B);
    };

    const E = new RealState();
    E.goNext = () => {
      player.changeState(A);
    };

    player.changeState(E);
    expect(player.state).to.eq(E);
    E.goNext();
    expect(player.state).to.eq(A);
    A.goNext();
    expect(player.state).to.eq(B);
    B.goNext();
    expect(player.state).to.eq(C);
    C.goNext();
    expect(player.state).to.eq(D);
    D.goNext();
    expect(player.state).to.eq(B);
  });
});
