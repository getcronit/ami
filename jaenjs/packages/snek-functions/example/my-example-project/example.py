from sys import argv


def main(a: int, b: int) -> int:
    print(a + b + 1)
    return a + b


if __name__ == '__main__':
    main(int(argv[1]), int(argv[2]))
