import { BaseProblemSolver } from './BaseProblemSolver';

enum HandType {
  FiveOfAKind = 5,
  FourOfAKind = 14,
  FullHouse = 23,
  ThreeOfAKind = 113,
  TwoPair = 122,
  Pair = 1112,
  High = 23456,
}

type Hand = {
  desc: number[];
  type: HandType;
};
type Bid = {
  hand: Hand;
  amount: number;
};
type Input = Bid[];
type Output1 = number;
type Output2 = number;

export class ProblemSolver extends BaseProblemSolver<Input, Output1, Output2> {
  parseInput1(input: string[]): Input {
    const parseHand = (hand: string): Hand => {
      const parseCard = (card: string) => {
        switch (card) {
          case 'A':
            return 14;
          case 'K':
            return 13;
          case 'Q':
            return 12;
          case 'J':
            return 11;
          case 'T':
            return 10;
          default:
            return parseInt(card, 10);
        }
      };

      const desc = Array.from(hand).map(parseCard);

      const cardMap: Map<number, number> = new Map();
      desc.forEach(card => {
        cardMap.set(card, (cardMap.get(card) || 0) + 1);
      });
      const type = [...cardMap.values()].sort().reduce((acc, val) => acc * 10 + val);
      return { desc, type };
    };

    const parseBid = (bid: string): Bid => {
      const [hand, amount] = bid.split(' ');
      return {
        hand: parseHand(hand),
        amount: parseInt(amount, 10),
      };
    };

    return input.filter(line => line.length > 0).map(line => parseBid(line));
  }

  parseInput2(input: string[]): Input {
    const parseHand = (hand: string): Hand => {
      const parseCard = (card: string) => {
        switch (card) {
          case 'A':
            return 14;
          case 'K':
            return 13;
          case 'Q':
            return 12;
          case 'J':
            return 0;
          case 'T':
            return 10;
          default:
            return parseInt(card, 10);
        }
      };

      const desc = Array.from(hand).map(parseCard);

      const cardMap: Map<number, number> = new Map();
      desc.forEach(card => {
        cardMap.set(card, (cardMap.get(card) || 0) + 1);
      });

      let type: number;
      const jokerCount = cardMap.get(0) ?? 0;
      cardMap.delete(0);

      if (cardMap.size > 0) {
        const sortedCards = [...cardMap.entries()].sort((a, b) => a[1] - b[1]);
        sortedCards[sortedCards.length - 1] = [
          sortedCards[sortedCards.length - 1][0],
          sortedCards[sortedCards.length - 1][1] + jokerCount,
        ];
        type = sortedCards.reduce((acc, card) => acc * 10 + card[1], 0);
      } else {
        type = HandType.FiveOfAKind;
      }

      return { desc, type };
    };

    const parseBid = (bid: string): Bid => {
      const [hand, amount] = bid.split(' ');
      return {
        hand: parseHand(hand),
        amount: parseInt(amount, 10),
      };
    };

    return input.filter(line => line.length > 0).map(line => parseBid(line));
  }

  private helper(input: Input): number {
    function compareHand(hand1: Hand, hand2: Hand) {
      if (hand1.type !== hand2.type) {
        return hand2.type - hand1.type;
      }

      const n = hand1.desc.length;
      for (let index = 0; index < n; index++) {
        const result = hand1.desc[index] - hand2.desc[index];
        if (result != 0) {
          return result;
        }
      }

      return 0;
    }

    return input
      .sort((bid1, bid2) => compareHand(bid1.hand, bid2.hand))
      .reduce((acc, bid, index) => acc + bid.amount * (index + 1), 0);
  }

  question1(input: Input): Output1 {
    return this.helper(input);
  }

  question2(input: Input): Output2 {
    return this.helper(input);
  }
}
