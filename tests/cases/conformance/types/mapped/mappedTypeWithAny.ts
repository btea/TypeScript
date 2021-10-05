// @strict: true
// @declaration: true

type Item = { value: string };
type ItemMap<T> = { [P in keyof T]: Item };

declare let x0: keyof any;
declare let x1: { [P in any]: Item };
declare let x2: { [P in string]: Item };
declare let x3: { [P in keyof any]: Item };
declare let x4: ItemMap<any>;

// Repro from #19152

type Data = {
  value: string;
}

type StrictDataMap<T> = {
  [P in keyof T]: Data
}

declare let z: StrictDataMap<any>;
for (let id in z) {
  let data = z[id];
  let x = data.notAValue;  // Error
}

// Issue #46169.
// We want mapped types whose constraint is `keyof T` to
// map over `any` differently, depending on whether `T`
// is constrained to an array-like type.
type Arrayish<T extends unknown[]> = { [K in keyof T]: T[K] };
type Objectish<T extends unknown> = { [K in keyof T]: T[K] };

function bar(arrayish: Arrayish<any>, objectish: Objectish<any>) {
    let arr: any[];
    arr = arrayish;
    arr = objectish;
}

declare function stringifyArray<T extends readonly any[]>(arr: T): { -readonly [K in keyof T]: string };
let abc: any[] = stringifyArray(void 0 as any);