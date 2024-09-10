import type { AnySoupElement } from "@tscircuit/soup"
import { findConnectedNetworks } from "./findConnectedNetworks"
import { ConnectivityMap } from "./ConnectivityMap"

export const getSourcePortConnectivityMapFromCircuitJson = (
  circuitJson: AnySoupElement[],
) => {
  const connections: string[][] = []

  for (const element of circuitJson) {
    if (element.type === "source_trace") {
      connections.push([
        ...(element.connected_source_port_ids ?? []),
        ...(element.connected_source_net_ids ?? []),
      ])
    }
  }

  const netMap = findConnectedNetworks(connections)

  return new ConnectivityMap(netMap)
}
