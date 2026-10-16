import type { Service, ServiceProps } from "../entities/Service.ts";

export interface IServiceRepository {
  findAll(): Promise<Service[]>;
  findActive(): Promise<Service[]>;
  findById(id: string): Promise<Service | null>;
  findByCategory(category: string): Promise<Service[]>;
  create(props: Omit<ServiceProps, "id" | "createdAt" | "updatedAt">): Promise<Service>;
  update(id: string, props: Partial<ServiceProps>): Promise<Service | null>;
  delete(id: string): Promise<boolean>;
}
