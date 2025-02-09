import { EntropyTile, Tile } from "../grid service/utils/tile.util"

export interface EntropySummary {
    options: Tile[]
    atIndex: number
}

export interface TileNeighbors {
    top: EntropyTile | undefined, 
    bottom: EntropyTile | undefined
    left: EntropyTile | undefined
    right: EntropyTile | undefined
    topRight: EntropyTile | undefined
    topLeft: EntropyTile | undefined
    bottomRight: EntropyTile | undefined
    bottomLeft: EntropyTile | undefined
}