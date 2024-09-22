import { test, expect } from "bun:test"
import { ConnectivityMap } from "../src/ConnectivityMap"

test("ConnectivityMap.addConnections should merge existing nets correctly", () => {
  const initialNetMap = {
    net1: ["A", "B"],
    net2: ["C", "D"],
    net3: ["E", "F"],
  }

  const connectivityMap = new ConnectivityMap(initialNetMap)

  connectivityMap.addConnections([
    ["B", "C"], // This should merge net1 and net2
    ["F", "G"], // This should add G to net3
    ["H", "I"], // This should create a new net
  ])

  // Check if net1 and net2 are merged
  expect(connectivityMap.areIdsConnected("A", "D")).toBe(true)
  expect(
    connectivityMap
      .getIdsConnectedToNet(connectivityMap.getNetConnectedToId("A")!)
      .sort(),
  ).toEqual(["A", "B", "C", "D"])

  // Check if G is added to net3
  expect(connectivityMap.areIdsConnected("E", "G")).toBe(true)
  expect(
    connectivityMap
      .getIdsConnectedToNet(connectivityMap.getNetConnectedToId("E")!)
      .sort(),
  ).toEqual(["E", "F", "G"])

  // Check if H and I are in a new net
  expect(connectivityMap.areIdsConnected("H", "I")).toBe(true)
  expect(connectivityMap.areIdsConnected("H", "A")).toBe(false)

  // Check if all original connections are maintained
  expect(connectivityMap.areIdsConnected("A", "B")).toBe(true)
  expect(connectivityMap.areIdsConnected("C", "D")).toBe(true)
  expect(connectivityMap.areIdsConnected("E", "F")).toBe(true)

  // Check if unrelated nets remain separate
  expect(connectivityMap.areIdsConnected("A", "E")).toBe(false)
  expect(connectivityMap.areIdsConnected("D", "G")).toBe(false)
  expect(connectivityMap.areIdsConnected("F", "H")).toBe(false)
})
