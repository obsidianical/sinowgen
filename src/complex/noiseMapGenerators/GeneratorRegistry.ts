import HeightMapGenerator from "./HeightMapGenerator";
import HeatMapGenerator from "./HeatMapGenerator";
import MoistureMapGenerator from "./MoistureMapGenerator";
import GroundHardnessMapGenerator from "./GroundHardnessMapGenerator";
import NoiseMapGenerator from "./NoiseMapGenerator";
import {app} from "../../App";
import {ValueMapSet} from "../biomeGeneration/BiomeGenerator";

export default class GeneratorRegistry {

    public static readonly BASE_SEED = Date.now();
    public static readonly BASE_SCALE = 0.05;

    private readonly registryIdentifier: string;
    private registry: { [key: string]: NoiseMapGenerator } = {};

    constructor(registryIdentifier: string) {
        this.registryIdentifier = registryIdentifier;
    }

    public registerGenerators(): void {
        const heightMapGenerator = this.register(
            new HeightMapGenerator(
                {
                    seed:      GeneratorRegistry.BASE_SEED,
                    detail:    8,
                    scale:     GeneratorRegistry.BASE_SCALE,
                    relevance: 0.15,
                }, {
                    seed:      GeneratorRegistry.BASE_SEED + 1,
                    detail:    4,
                    scale:     GeneratorRegistry.BASE_SCALE * 0.075,
                    relevance: 0.85,
                }, app.WIDTH, app.HEIGHT),
            "height_map_generator",
        );

        const heatMapGenerator = this.register(
            new HeatMapGenerator(
                {
                    detail: 2,
                    scale:  GeneratorRegistry.BASE_SCALE * 0.5,
                    seed:   GeneratorRegistry.BASE_SEED + 2,
                },
                app.WIDTH,
                app.HEIGHT,
                heightMapGenerator.map,
            ), "heat_map_generator");

        const moistureMapGenerator = this.register(
            new MoistureMapGenerator(
                {
                    detail: 6,
                    scale:  GeneratorRegistry.BASE_SCALE * 1.25,
                    seed:   GeneratorRegistry.BASE_SEED + 3,
                },
                app.WIDTH,
                app.HEIGHT,
                heatMapGenerator.map,
            ), "moisture_map_generator");

        const groundHardnessMapGenerator = this.register(
            new GroundHardnessMapGenerator(
                {
                    detail: 4,
                    scale:  GeneratorRegistry.BASE_SCALE * 1.5,
                    seed:   GeneratorRegistry.BASE_SEED + 4,
                },
                app.WIDTH,
                app.HEIGHT,
                heatMapGenerator.map,
                moistureMapGenerator.map,
                heightMapGenerator.map,
            ), "ground_hardness_map_generator");
    }

    public get(key: string): NoiseMapGenerator {
        if (this.registry[key]) return this.registry[key];
        else throw new Error(`RegistryObject "${key}" doesn't exist.`);
    }

    public getMapsFromAllGenerators(): ValueMapSet {
        return {
            heatMap: this.get("heat_map_generator").map,
            moistureMap: this.get("moisture_map_generator").map,
            groundHardnessMap: this.get("ground_hardness_map_generator").map,
            heightMap: this.get("height_map_generator").map,
        };
    }

    private register(generator: NoiseMapGenerator, key: string): NoiseMapGenerator {
        this.registry[key] = generator;
        return generator;
    }
}
