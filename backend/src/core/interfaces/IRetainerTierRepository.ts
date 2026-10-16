import type { RetainerTier, RetainerTierProps } from "../entities/RetainerTier.ts";

export interface IRetainerTierRepository {
  findAll(): Promise<RetainerTier[]>;
  findActive(): Promise<RetainerTier[]>;
  findById(id: string): Promise<RetainerTier | null>;
  create(props: Omit<RetainerTierProps, "id" | "createdAt" | "updatedAt">): Promise<RetainerTier>;
  update(id: string, props: Partial<RetainerTierProps>): Promise<RetainerTier | null>;
  delete(id: string): Promise<boolean>;
}
