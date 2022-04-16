import Command from './Command';
import { expect } from 'chai';

describe('Command', () => {
  it('can create command with sync function and execute as expected', async () => {
    let i = 0;
    const writeIValueProcess = () => {
      i = 10
    };
    const writeIValueCommand = new Command(writeIValueProcess);
    await writeIValueCommand.execute();
    expect(i).to.eq(10);
  });

  it('can create command with async function and execute as expected', async () => {
    let i = 0;
    const writeIValueProcess = async () => {
      i = 10
    };
    const writeIValueCommand = new Command(writeIValueProcess);
    await writeIValueCommand.execute();
    expect(i).to.eq(10);
  });

  it('should return the expected result after the command has been executed', async () => {
    const returnValueProcess = () => {
      return 10;
    };
    const returnValueCommand = new Command(returnValueProcess);
    const result = await returnValueCommand.execute();
    expect(result).to.eq(10);
  });

  it('can get an initial value when executes the command', async () => {
    const getAValueToTimes = (v: any) => {
      return v * 2;
    }
    const timesCommand = new Command(getAValueToTimes);
    const result = await timesCommand.execute(10);
    expect(result).to.eq(20);
  });
});
