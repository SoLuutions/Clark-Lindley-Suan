# Asset Credits & Licenses — VEILBREAKER (Ward 09)

All third-party 3D models, animations, HDRI sky maps, and PBR textures in `/assets/` are **CC0 1.0 Universal (Public Domain)** and optimized with `@gltf-transform/cli` (`--compress meshopt --texture-compress webp`) and WebP encoding.

- **Total `/assets/` footprint on disk:** ~9.4 MB (well within the 30 MB budget).
- **Desktop network transfer (including Three.js r164 CDN modules):** ~9.5 MB.
- **Touch/mobile texture tier:** automatically loads `_512.webp` PBR sets (~350 KB combined instead of ~3.8 MB).

---

## 1. Skinned Characters & Skeletal Animations (`assets/chars/`)

Source: **KayKit Character Pack — Adventurers 1.0** & **KayKit Character Pack — Skeletons 1.0** by **Kay Lousberg**  
Repositories:
- `https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0`
- `https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Skeletons-1.0`  
License: **CC0 1.0 Universal**  
Processing: Animation tracks pruned to the 16–20 clips used by gameplay states, compressed with `meshopt` + WebP (`1024` for standard rigs, `2048` for boss).

| File | Original Asset | Optimization | Size |
| :--- | :--- | :--- | ---: |
| `assets/chars/player.glb` | `Rogue_Hooded.glb` | 16 clips, meshopt + WebP 1024 | 505 KB |
| `assets/chars/thrall.glb` | `Skeleton_Minion.glb` | 20 clips, meshopt + WebP 1024 | 640 KB |
| `assets/chars/lancer.glb` | `Skeleton_Rogue.glb` | 20 clips, meshopt + WebP 1024 | 645 KB |
| `assets/chars/caster.glb` | `Skeleton_Mage.glb` | 20 clips, meshopt + WebP 1024 | 627 KB |
| `assets/chars/boss.glb` | `Skeleton_Warrior.glb` | 20 clips, meshopt + WebP 2048 | 657 KB |

---

## 2. Hand-Bone Weapons & Grimoire (`assets/weapons/`)

Source: **Quaternius** (mirrored via `https://github.com/trebeljahr/quaternius-showcase`)  
License: **CC0 1.0 Universal**  
Processing: Optimized with `meshopt` + WebP 1024.

| File | Original Pack & Asset | Size |
| :--- | :--- | ---: |
| `assets/weapons/pistol.glb` | `modular_sci_fi_guns_pack/Pistol_1.glb` | 19 KB |
| `assets/weapons/katana.glb` | `single_knight_pack/Katana.glb` | 11 KB |
| `assets/weapons/cleaver.glb` | `medieval_weapons_pack/Scythe.glb` | 22 KB |
| `assets/weapons/spear.glb` | `medieval_weapons_pack/Spear.glb` | 20 KB |
| `assets/weapons/grimoire.glb` | `modular_dungeon_pack/Book_Open.glb` | 11 KB |
| `assets/weapons/greatsword.glb` | `medieval_weapons_pack/Claymore.glb` | 13 KB |

---

## 3. Environment Props, Buildings, Vehicles & Foliage (`assets/props/`)

Sources:
- **Quaternius** (`https://github.com/trebeljahr/quaternius-showcase`) — Stylized City, Medieval/Dungeon, Nature, and Street packs (**CC0 1.0**)
- **KayKit City Builder Bits 1.0** (`https://github.com/KayKit-Game-Assets/KayKit-City-Builder-Bits-1.0`) by Kay Lousberg (**CC0 1.0**)
- **KayKit Dungeon Remastered 1.1** (`https://github.com/KayKit-Game-Assets/KayKit-Dungeon-Remastered-1.1`) by Kay Lousberg (**CC0 1.0**)

Processing: All GLBs optimized via `@gltf-transform/cli optimize --compress meshopt --texture-compress webp` (`1024`, hero props up to `2048`).

| File | Source Pack | Role in Scene | Size |
| :--- | :--- | :--- | ---: |
| `assets/props/arch_gate.glb` | Quaternius Modular Dungeon | Metro Plaza Entry Archway (`z = 27`) | 60 KB |
| `assets/props/bldg_tall_a.glb` | Quaternius Stylized City (`4Story_Mat`) | Instanced perimeter high-rise | 68 KB |
| `assets/props/bldg_tall_b.glb` | Quaternius Stylized City (`3Story_Balcony_Mat`) | Instanced perimeter building | 53 KB |
| `assets/props/bldg_mid_a.glb` | Quaternius Stylized City (`2Story_Columns_Mat`) | Instanced perimeter mid-rise | 43 KB |
| `assets/props/bldg_mid_b.glb` | Quaternius Stylized City (`2Story_Sign_Mat`) | Instanced perimeter mid-rise | 42 KB |
| `assets/props/car_sedan.glb` | KayKit City Builder Bits | Hero parked sedan (Physical clearcoat paint + glass) | 26 KB |
| `assets/props/car_police.glb` | KayKit City Builder Bits | Perimeter quarantine police cruiser | 27 KB |
| `assets/props/lamp_street.glb` | Quaternius Street Props | Instanced courtyard warm sodium streetlights | 17 KB |
| `assets/props/lamp_double.glb` | Quaternius Street Props | Instanced sanctum violet/crimson double lamps | 33 KB |
| `assets/props/tree_lush.glb` | Quaternius Stylized Nature | Courtyard planter trees | 41 KB |
| `assets/props/tree_dead.glb` | Quaternius Stylized Nature | Sanctum-border withered trees | 20 KB |
| `assets/props/bush.glb` | Quaternius Stylized Nature | Instanced sidewalk planter shrubs | 5 KB |
| `assets/props/pillar.glb` | Quaternius Modular Dungeon | Courtyard cover & sanctum columns | 9 KB |
| `assets/props/pillar_broken.glb` | Quaternius Modular Dungeon | Ruined sanctum columns | 4 KB |
| `assets/props/statue.glb` | Quaternius Modular Dungeon | Instanced sanctum apse statues | 26 KB |
| `assets/props/candelabrum.glb` | Quaternius Modular Dungeon | Instanced sanctum altar candelabra | 17 KB |
| `assets/props/candles.glb` | KayKit Dungeon Remastered | Instanced ritual wax candles | 13 KB |
| `assets/props/stairs.glb` | KayKit Dungeon Remastered | Sanctum dais threshold steps | 17 KB |
| `assets/props/barrier.glb` | KayKit Dungeon Remastered | Instanced quarantine barriers | 11 KB |
| `assets/props/bench.glb` | KayKit City Builder Bits | Instanced sidewalk benches | 11 KB |
| `assets/props/dumpster.glb` | KayKit City Builder Bits | Instanced street dumpsters | 13 KB |
| `assets/props/firehydrant.glb` | KayKit City Builder Bits | Instanced street fire hydrants | 13 KB |
| `assets/props/rail.glb` | Quaternius Street Props | Instanced sidewalk & stair guardrails | 3 KB |
| `assets/props/sign_hazard.glb` | Quaternius Street Props | Instanced quarantine warning signs | 4 KB |
| `assets/props/sign_neon.glb` | Quaternius Street Props | Instanced emissive street signs | 4 KB |
| `assets/props/rock.glb` | Quaternius Stylized Nature | Instanced courtyard & sanctum boulders | 3 KB |

---

## 4. Sky HDRI (`assets/sky/`)

Source: **Poly Haven** (`https://polyhaven.com/a/kloppenheim_02_puresky`)  
License: **CC0 1.0 Universal**

| File | Original Asset | Resolution | Size |
| :--- | :--- | :--- | ---: |
| `assets/sky/night_sky.hdr` | `kloppenheim_02_puresky_1k.hdr` | 1024×512 RGBE HDR | 1,361 KB |

---

## 5. PBR Surface Texture Sets & Decals/VFX (`assets/tex/`)

Surface PBR sets sourced from **Poly Haven** (`https://polyhaven.com`), License: **CC0 1.0 Universal**. Converted to WebP (albedo + tangent-space normalMap + packed ORM/ARM) with `_512.webp` touch variants.

| File(s) | Poly Haven Source | Role | Desktop Size | Touch (`_512`) Size |
| :--- | :--- | :--- | ---: | ---: |
| `ground_diff/nor/arm.webp` | `cobblestone_embedded_asphalt` | Wet urban plaza ground (2K) | 2,979 KB | 147 KB |
| `sanctum_diff/nor/arm.webp` | `cobblestone_floor_04` | Boss Sanctum stone dais (1K) | 558 KB | 150 KB |
| `wall_diff/nor/arm.webp` | `concrete_layers` | Sidewalks, kerbs & stone planters (1K) | 350 KB | 56 KB |

Decals & Sky/VFX Sprites (project-authored via Python/Pillow, **CC0 1.0 Universal**):

| File | Role | Size |
| :--- | :--- | ---: |
| `assets/tex/decal_puddle.webp` | Glossy physical clearcoat rain puddle alpha mask | 20 KB |
| `assets/tex/decal_crack.webp` | Weathered wet stone fissure decal | 16 KB |
| `assets/tex/decal_manhole.webp` | Cast-iron street storm drain / manhole decal | 23 KB |
| `assets/tex/sky_moon.webp` | Stylized nocturnal moon sprite | 14 KB |
| `assets/tex/vfx_spark.webp` | Radial soft glow sprite for combat particle sparks | 2 KB |
